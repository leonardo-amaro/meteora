import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    const produtoExiste = carrinho.some((itemCarrinho) => {
      itemCarrinho.id === novoProduto.id;
    });

    if (!produtoExiste) {
      novoProduto.quantidade = 1;
      setCarrinho((carrinhoAnterior) => [...carrinhoAnterior, novoProduto]);
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemCarrinho) => {
        if (itemCarrinho.id === novoProduto.id) itemCarrinho.quantidade += 1;
        return itemCarrinho;
      })
    );
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemCarrinho) => itemCarrinho.id === id);
    
    if (produto.quantidade === 1) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemCarrinho) => itemCarrinho.id !== id)
      );
    }
    
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemCarrinho) => {
        if (itemCarrinho.id === id) itemCarrinho.quantidade -= 1;
        return itemCarrinho;
      })
    );
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  };
};
