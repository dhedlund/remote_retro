defmodule RemoteRetro.TestHelpers do
  use Wallaby.DSL
  alias RemoteRetro.Repo

  def persist_idea_for_retro(context) do
    %{idea: idea, retro: retro} = context
    idea = Map.put(idea, :retro_id, retro.id)
    idea = Repo.insert!(idea)

    Map.put(context, :idea, idea)
  end

  def new_browser_session(metadata \\ %{}) do
    {:ok, session} = Wallaby.start_session(metadata: metadata)
    resize_window(session, 1000, 1000)
  end

  def stub_js_confirms_for_phantomjs(session) do
    execute_script(session, "window.confirm = function(){ return true; }")
  end

  def proceed_to_action_items_stage(facilitator_session) do
    facilitator_session |> find(Query.button("Proceed to Action Items")) |> Element.click
    facilitator_session |> find(Query.button("Yes")) |> Element.click
  end

  def authenticate(session) do
    visit(session, "/auth/google/callback?code=love")
  end

  def submit_idea(session, %{ category: category, body: body }) do
    session
    |> find(Query.css("form"))
    |> click(Query.option(category))
    |> fill_in(Query.text_field("idea"), with: body)
    |> click(Query.button("Submit"))

    session
  end

  def delete_idea(session, %{body: body}) do
    session
    |> find(Query.css(".ideas li", text: body))
    |> click(Query.css(".remove.icon"))
  end
end
