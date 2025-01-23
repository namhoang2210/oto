import React from 'react';
import API from "../api";

const UserContext = React.createContext();

class UserProvider extends React.Component {
	state = {
		user: null,
		carts: []
	};

	componentDidMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			this.setState({ user });

			API.get(`/carts?user_id=${user._id}`)
				.then((response) => {
				const carts = response.data.carts;
				carts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
				this.setState({ carts });
				})
				.catch((error) => {
				console.error('Error fetching products:', error);
				});
		}

	}

	setUser = (user) => {
		this.setState({ user });
		localStorage.setItem('user', JSON.stringify(user));
	};

	setCarts = () => {
		API.get(`/carts?user_id=${this.state.user._id}`)
			.then((response) => {
			const carts = response.data.carts;
			carts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			this.setState({ carts });
			})
			.catch((error) => {
			console.error('Error fetching products:', error);
			});

	}

	render() {
		return (
			<UserContext.Provider
				value={{
					user: this.state.user,
					carts: this.state.carts,
					setUser: this.setUser,
					setCarts: this.setCarts
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export { UserContext, UserProvider };