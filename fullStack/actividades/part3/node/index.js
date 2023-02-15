const http = require("http");
const express = require("express");
const app = express();

const notes = [
  {
    id: 1,
    content:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    date: "22/02/23",
    important: true,
  },
  {
    id: 2,
    content: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    date: "22/02/23",
    important: false,
  },
  {
    id: 3,
    content: "dolorem eum magni eos aperiam quia holas",
    date: "22/02/23",
    important: true,
  },
];

app.get("/api/notes", (requets, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (requets, response) => {
  const id = Number(requets.params.id);

  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const port = 3000;
app.listen(port, () => [console.log(`live server in port ${port}`)]);
