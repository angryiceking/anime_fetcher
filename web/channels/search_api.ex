defmodule AnimeFetcher.SearchApi do
	use AnimeFetcher.Web, :channel
	alias AnimeFetcher.Presence

	def join("fetch:anime", _, socket) do
		send self(), :after_search
		{:ok, socket}
	end

	def handle_info(:after_search, socket) do
		Presence.track(socket, socket.assigns.search, %{
			result: :"currently we'll connect to db"
		})
		{:noreply, socket}
	end

end