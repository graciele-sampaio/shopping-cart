require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função', async () => {
    expect(typeof await fetchItem).toBe('function')
   });

   it('Teste se ao executar a função fetchItem com o argumento do item "MLB1615760527", teste se a função fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
   });

   it('Teste se ao executar a função fetchItem com o argumento do item "MLB1615760527", teste se se a função  fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
   });

   it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect(await fetchItem('MLB1615760527')).toStrictEqual(item)
   });
   
   it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async() => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'))
   });
});
