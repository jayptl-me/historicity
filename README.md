# Historical Event Connector

## Overview

The Historical Event Connector is a web application that allows users to explore relationships between historical events, figures, and locations using a knowledge graph powered by Graph RAG (Retrieval-Augmented Generation). It leverages Pinecone for vector storage and retrieval, and DBpedia (structured data from Wikipedia) as the primary data source for historical information. The application provides a user-friendly interface for querying historical connections and viewing summarized results, making it an educational tool for historians, students, and history enthusiasts.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Hono (lightweight web framework), Pinecone (vector database), Axios (HTTP requests), Zod (input validation)
- **Data Source:** DBpedia (structured Wikipedia data via SPARQL queries)

## Setup Instructions

### Backend Setup

#### Prerequisites

- Node.js (v18+)
- npm or yarn
- A Pinecone account (sign up at [pinecone.io](https://www.pinecone.io/))

#### Clone the Repository

```sh
git clone https://github.com/your-repo/historical-event-connector.git
cd historical-event-connector/backend
```

#### Install Dependencies

```sh
npm install
```

#### Set Up Pinecone

- Create a Pinecone project and obtain your API key.
- Create an index named `historical-connector` with:
  - Dimension: 768
  - Metric: Cosine similarity

#### Configure Environment Variables

Create a `.env` file in the backend directory with the following:

```
PINECONE_API_KEY=your-pinecone-api-key
PORT=3000
CORS_ORIGIN=http://localhost:3000  # Update to your frontend URL in production
```

#### Run the Server

```sh
node index.js
```

### Frontend Setup

#### Prerequisites

- Node.js (v18+)
- npm or yarn

#### Navigate to Frontend Directory

```sh
cd ../frontend
```

#### Install Dependencies

```sh
npm install
```

#### Run the Development Server

```sh
npm start
```

## Usage

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
- Enter a query in the search bar, such as:
  - "What were the key events leading up to World War II?"
  - "Who were the main figures in the French Revolution?"
- View the summarized results and connections displayed on the page, including events, figures, locations, and descriptions.

## Deployment

### Deploying the Backend

#### Option 1: Vercel

1. Push your backend code to a Git repository.
2. Import the repository into Vercel.
3. Set the Framework Preset to Node.js.
4. Add the following environment variables in Vercel's dashboard:
   - `PINECONE_API_KEY=your-pinecone-api-key`
   - `CORS_ORIGIN=https://your-frontend-url.com` (replace with your frontend's production URL)
5. Deploy the project.

#### Option 2: Cloudflare Workers

1. Install the wrangler CLI:

   ```sh
   npm install -g wrangler
   ```

2. Configure `wrangler.toml` with your Pinecone API key and other settings.
3. Deploy using:

   ```sh
   wrangler deploy
   ```

### Deploying the Frontend

1. Build the React application:

   ```sh
   npm run build
   ```

2. Host the contents of the `build` folder on a static site host such as Netlify, Vercel, or GitHub Pages.
3. Update the backend's `CORS_ORIGIN` environment variable to match the deployed frontend URL.

## API Documentation

The backend exposes the following APIs:

### `GET /status`
Check if the server is running.

**Response:**
```json
{ "status": "ok" }
```

### `GET /trending`
Retrieve a list of trending or suggested queries.

**Response:**
```json
["Key events of World War II", "French Revolution connections", "American Civil War figures", "Renaissance key figures"]
```

### `POST /search`
Submit a query to retrieve historical connections.

**Request Body:**
```json
{ "query": "your query here" }
```

**Response:**
```json
{
  "summary": "Summary of the query results",
  "connections": [
    {
      "event": "Event name",
      "figure": "Associated figure",
      "location": "Location",
      "year": "Year",
      "description": "Brief description"
    }
    // ...
  ]
}
```

## Known Issues

- The embedding function in the backend is mocked for simplicity and should be replaced with a real embedding model (e.g., Hugging Face's sentence-transformers) for production use.
- Data fetching is currently limited to World War II-related events for demonstration purposes. To expand coverage, modify the SPARQL query in the backend to include additional historical topics or use broader data sources like Wikidata.

## License

This project is licensed under the MIT License. See the LICENSE file for details.