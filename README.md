# Birthday site for Preksha

## Live public website

[Open the latest Preksha Birthday Surprise](https://harisha810560-cell.github.io/birthday/)

Open `index.html` in any browser to preview it.

## Personalising the words

Look for the HTML comments in `index.html`. The first message is in the `message-panel`, the wishes are in `wish-list`, and the final note is in `final-panel`.

## Adding a page

1. Copy an existing `<section class="panel" ...>` block in `index.html`.
2. Give it the next `data-page` number and add your content.
3. Add one matching `.dot` button in the progress navigation with the same `data-go-to` number.

The page navigation automatically detects new panels, so no JavaScript change is required.
