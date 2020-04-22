const decoratorValidator = (fn, schema, argsType) => {
  return async function (event) {
    // console.log('event', event)
    // console.log('schema', schema)
    // console.log('argsType', argsType)

    const data = JSON.parse(event[argsType])
    //abortEarly == mostra todos os erros de uma vez
    const { error, value } = await schema.validate(
      data, { abortEarly: true }
    )
    
    //Isso vai alterar a instância de arguments
    event[argsType] = value
    /* Arguments serve para pegar todos os argumentos que vieram na função
       e mandar para frente
       o apply vai retornar a função que será executada posteriormente
    */
    if(!error) return fn.apply(this, arguments)
    
    return {
      statusCode: 422, //unprocessable entity,
      body: error.message
    }
    
  }
}

module.exports = decoratorValidator