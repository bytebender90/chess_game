defmodule SimpleChess.StockFish do
  require Logger

  @stockfish "stockfish"
  def get_best_move(fen) do
    port = Port.open({:spawn, @stockfish}, [:binary])

    send(port, {self(), {:command, "uci\n"}})
    send(port, {self(), {:command, "setoption name UCI_LimitStrength value true\n"}})
    send(port, {self(), {:command, "setoption name UCI_Elo value 2000\n"}})
    send(port, {self(), {:command, "ucinewgame\n"}})
    send(port, {self(), {:command, "isready\n"}})
    send(port, {self(), {:command, "position fen #{fen}\n"}})
    send(port, {self(), {:command, "go movetime 500\n"}})
    bestmove = receive_best_move(port)
    send(port, {self(), :close})

    bestmove
  end

  defp receive_best_move(port) do
    receive do
      {^port, {:data, answer}} ->
        with {:ok, bestmove} <- get_bestmove_from_answer(answer) do
          bestmove
        else
          _ -> receive_best_move(port)
        end
    after
      60_000 ->
        :timeout
    end
  end

  defp get_bestmove_from_answer(answer) do
    if Regex.match?(~r/bestmove/m, answer) do
      {from, to} =
        Regex.run(~r/bestmove ([[:word:]]+)/, answer)
        |> Enum.fetch!(1)
        |> String.split_at(2)

      {:ok, %{from: from, to: to}}
    else
      {:noop, nil}
    end
  end
end
