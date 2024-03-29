const formatDate = (dateString) => {
    const date = new Date(dateString)
    // DD/MM/YYYY
    const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`
    return formattedDate
}

export default formatDate
