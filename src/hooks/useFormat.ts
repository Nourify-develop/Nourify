const useFormat = () => {
    const formatPrice = (price: number) => {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }
  
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  
    return { formatPrice, capitalizeFirstLetter }
  }
  
  export default useFormat
  