class Data {
    /**
     * type objIntroduction
     * @typedef {Object} objIntroduction
     * @property {string} nameClient
     * @property {string} tel
     * @property {number} company
     * @property {number} place
     */
    /**
    /**
     * Params of class
     * @param {objIntroduction} header
     * @param {Array.< {nameProduct: string, model: string, amount: number, price: number, description: string, units: string} >} products
     * @param {String} deliveryTime
     * @param {Array} conditions
     * @param {String} signature
     */
    constructor(header, products, deliveryTime, conditions, signature) {
      if (typeof header !== 'object') {
        throw new Error('Header parameter must be an object')
      }
      if (typeof products !== 'object' && typeof products[0] !== 'object') {
        throw new Error('Products parameter must be an Array')
      }
      if (typeof deliveryTime !== 'string') {
        throw new Error('DeliveryTime parameter must be a String')
      }
      if (typeof conditions !== 'object') {
        throw new Error('Conditions parameter must be an Array')
      }
      if (typeof signature !== 'string') {
        throw new Error('Signature parameter must be an String')
      }
      this.header = header
      this.products = products
      this.deliveryTime = deliveryTime
      this.conditions = conditions
      this.signature = signature
    }
  }

  export default Data