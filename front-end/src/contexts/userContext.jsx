import React from 'react';

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

			const carts = JSON.parse(localStorage.getItem('carts'));
			if (carts) {
				const cartData = carts.filter(cart => cart.customer_id === user.id);
				this.setState({ carts : cartData });
			}
		}

	}

	setUser = (user) => {
		this.setState({ user });
		localStorage.setItem('user', JSON.stringify(user));
	};

	setCarts = (carts) => {
		const cartData = carts.filter(cart => cart.customer_id === this.state.user?.id);
		this.setState({ carts : cartData });
		localStorage.setItem('carts', JSON.stringify(carts));
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