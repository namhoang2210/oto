const formatDate = (time) => {
    const date = new Date(time);
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;  
  };
  
export default formatDate;