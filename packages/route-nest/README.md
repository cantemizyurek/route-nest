# Route Nest 🐉

Route Nest offers a unique, directory-based routing solution for structuring and
managing API routes. Designed for seamless integration with popular frameworks
like [Express](https://expressjs.com/) and [Hono](https://honojs.dev/), it
enables developers to organize routes in a library-like folder structure. This
approach simplifies the development process and enhances maintainability.

## 🌟 Features

- **📁 Directory-Based Routing:** Organize your API endpoints using a
  straightforward folder structure.
- **📦 Full TypeScript Support:** Take advantage of strong typing for better
  code quality and maintainability.
- **🧰 Zero Dependencies:** Lightweight with no external dependencies, ensuring
  fast and efficient operation.
- **🪛 Highly Extensible:** Easily extend functionality with Adapters to support
  additional frameworks.

## 📖 Usage

To start using Route Nest, you need to import and initialize it within your
project. Here’s a quick guide on how to set it up with Express:

### Installation

First, install the package and any necessary adapters:

```bash
npm install route-nest @route-nest/express
```

### Basic Setup

Import and initialize Route Nest along with your framework-specific adapter:

```typescript
import { initRouteNestTree } from 'route-nest'
import { initExpress } from '@route-nest/express-adapter'

async function startServer() {
  const app = initExpress(await initRouteNestTree('.'))
  app.listen(3000, () => console.log('Server listening on port 3000'))
}

startServer()
```

This setup assumes you have a directory called `app` at your project root,
containing your route files structured in a way that Route Nest can understand.

## 🤝 Contributing

Contributions are always welcome! Whether it's adding new features, improving
documentation, or reporting issues, please feel free to make a pull request or
open an issue.

## 📄 License

Route Nest is MIT licensed. For more information, please see the
[LICENSE](LICENSE.md) file.
