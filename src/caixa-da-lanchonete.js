/*
Caso item extra seja informado num pedido que não tenha o respectivo item principal, apresentar mensagem "Item extra não pode ser pedido sem o principal".
Combos não são considerados como item principal.
É possível pedir mais de um item extra sem precisar de mais de um principal.
Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"
Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".
Se o código do item não existir, apresentar mensagem "Item inválido!"
Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"
O CÓDIGO
*/

class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        // Itens e preços
        const cardapio = new Map([
            ['cafe', 3.00],
            ['chantily', 1.50],
            ['suco', 6.20],
            ['sanduiche', 6.50],
            ['queijo', 2.00],
            ['salgado', 7.25],
            ['combo1', 9.50],
            ['combo2', 7.50]
        ]);

        // Declaração das porcentagens de desconto de 5% e de acréscimo de 3%
        const descontoDinheiro = 0.05;
        const acrescimoCredito = 0.03;

        // Verificar método de pagamento
        if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let valorTotal = 0;
        let hasChantily = false;
        let hasQueijo = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!cardapio.has(codigo)) {
                return "Item inválido!";
            }

            // Verificar a quantidade antes de aplicar os descontos/acréscimos
            if (parseInt(quantidade) <= 0) {
                return "Quantidade inválida!";
            }

                

            // Verificar se há chantily ou queijo
            if (codigo === 'chantily') {
                hasChantily = true;
            }
            if (codigo === 'queijo') {
                hasQueijo = true;
            }

            // Calcular o valor total da compra
            valorTotal += cardapio.get(codigo) * parseInt(quantidade);
        }
        
        // Verificar obrigatoriedade de itens
        if (hasChantily && !itens.some(item => item.includes('cafe'))) {
            return "Item extra não pode ser pedido sem o principal";
        }
        
        if (hasQueijo && !itens.some(item => item.includes('sanduiche'))) {
            return "Item extra não pode ser pedido sem o principal";
        }

        
        // Verificar se há itens no carrinho
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Calcular porcentagens
        if (formaDePagamento === 'dinheiro') {
            valorTotal -= valorTotal * descontoDinheiro;
        } else if (formaDePagamento === 'credito') {
            valorTotal += valorTotal * acrescimoCredito;
        }

        // Arredondar resultado do cálculo para valor de moeda
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}
export { CaixaDaLanchonete };
