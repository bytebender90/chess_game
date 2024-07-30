defmodule SimpleChessWeb.GameController do
  use SimpleChessWeb, :controller
  alias SimpleChess.StockFish

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def bot(conn, %{"fen" => fen}) do
    move = StockFish.get_best_move(fen)
    render(conn, "bot.json", move)
  end
end
