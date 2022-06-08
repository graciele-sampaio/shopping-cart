require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
 it('verifica se fetchProducts é uma função', async () => {
  expect(typeof await fetchProducts).toBe('function')
 });

 it('verifica se ao executar a função fetchProducts com o argumento computador, testa se fetch foi chamada', async() => {
  expect.assertions(1);
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalled()
 });

 it('verifica se ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async() => {
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
 });

 it('verifica se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async() => {
  expect(await fetchProducts('computador')).toStrictEqual(computadorSearch.results)
 });

 it('verifica se  ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async() => {
  expect(await fetchProducts()).toEqual(new Error('You must provide an url'))
 }); 
});


