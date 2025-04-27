import { useContext, useEffect } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal
  } = useContext(CarrinhoContext);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemCarrinho) => {
      if (itemCarrinho.id === id) itemCarrinho.quantidade += quantidade;
      return itemCarrinho;
    })
  }

  function adicionarProduto(novoProduto) {
    const produtoExiste = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === novoProduto.id
    );

    if (!produtoExiste) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [...carrinhoAnterior, novoProduto]);
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);

    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemCarrinho) => itemCarrinho.id === id);
    
    if (produto.quantidade === 1) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemCarrinho) => itemCarrinho.id !== id)
      );
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1);
    
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProdutoCarrinho(id) {
    const carrinhoAtualizado = carrinho.filter((itemCarrinho) => itemCarrinho.id !== id);
    setCarrinho([...carrinhoAtualizado]);
  }

  useEffect(() => {
    const { quantidadeAnterior, totalAnterior } = carrinho.reduce(
      (valorAnterior, produto) => ({
        quantidadeAnterior: valorAnterior.quantidadeAnterior + produto.quantidade,
        totalAnterior: valorAnterior.totalAnterior + produto.preco * produto.quantidade,
      }),
      {quantidadeAnterior: 0, totalAnterior: 0}
    );
    setQuantidade(quantidadeAnterior);
    setValorTotal(totalAnterior);
  }, [carrinho]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
  };
};
