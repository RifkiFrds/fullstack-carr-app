/**
 * API Documentation Landing Page
 * Serves a professional, self-contained HTML page at GET /
 * Theme: Minimalist Neo-Brutalism
 */
module.exports = (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Universal Listing Platform — RESTful API documentation and endpoint reference.">
  <title>Universal Listing Platform — API Documentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    /* ─── Reset & Variables ────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Neo-Brutalism Light Theme */
      --bg-primary: #f8f9fa;
      --bg-card: #ffffff;
      --bg-code: #1e1e24;
      --border-color: #0f172a;
      
      --text-primary: #0f172a;
      --text-secondary: #334155;
      --text-muted: #64748b;
      
      /* Method Colors */
      --color-get: #10b981;
      --color-post: #3b82f6;
      --color-put: #f59e0b;
      --color-delete: #ef4444;
      
      /* Styling Defaults */
      --border-width: 2px;
      --radius: 8px;
      --shadow-brutal: 4px 4px 0px var(--border-color);
      --shadow-brutal-hover: 2px 2px 0px var(--border-color);
      
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
    }

    body {
      font-family: var(--font-sans);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      background-image: radial-gradient(#0f172a 1px, transparent 1px);
      background-size: 24px 24px;
      background-position: -12px -12px;
    }

    /* ─── Layout ──────────────────────────────────────── */
    .wrapper {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px 24px 80px;
    }

    /* ─── Typography & Utilities ──────────────────────── */
    h1, h2, h3 { font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); }
    
    .brutal-card {
      background: var(--bg-card);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--radius);
      box-shadow: var(--shadow-brutal);
      transition: all 0.2s ease-in-out;
    }

    .brutal-card:hover {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-brutal-hover);
    }

    /* ─── Hero ────────────────────────────────────────── */
    .hero {
      margin-bottom: 48px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #fef3c7;
      border: var(--border-width) solid var(--border-color);
      border-radius: 100px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      box-shadow: 2px 2px 0px var(--border-color);
      margin-bottom: 24px;
    }

    .hero-badge .dot {
      width: 10px;
      height: 10px;
      background: var(--color-get);
      border: 1.5px solid var(--border-color);
      border-radius: 50%;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4rem);
      line-height: 1.1;
      margin-bottom: 16px;
      text-transform: uppercase;
    }

    .hero p {
      font-size: 1.2rem;
      color: var(--text-secondary);
      font-weight: 500;
      max-width: 600px;
    }

    /* ─── Info Grid ────────────────────────────────────── */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 56px;
    }

    .info-item {
      padding: 20px;
    }

    .info-item .label {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .info-item .value {
      font-size: 1.25rem;
      font-weight: 800;
      font-family: var(--font-mono);
      word-break: break-all;
    }

    /* ─── Sections ────────────────────────────────────── */
    .section {
      margin-bottom: 56px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .section-icon {
      width: 44px;
      height: 44px;
      background: #fff;
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--radius);
      box-shadow: 2px 2px 0px var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }

    .section-header h2 {
      font-size: 1.8rem;
    }

    /* ─── Endpoint Table ──────────────────────────────── */
    .endpoint-group {
      background: var(--bg-card);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--radius);
      box-shadow: var(--shadow-brutal);
      overflow: hidden;
    }

    .endpoint-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: var(--border-width) solid var(--border-color);
      background: #fff;
    }

    .endpoint-row:last-child {
      border-bottom: none;
    }

    .endpoint-row:hover {
      background: #f8fafc;
    }

    .method {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      padding: 6px 12px;
      border: var(--border-width) solid var(--border-color);
      border-radius: 4px;
      min-width: 80px;
      text-align: center;
      box-shadow: 2px 2px 0px var(--border-color);
    }

    .method-get { background: #d1fae5; color: #065f46; }
    .method-post { background: #dbeafe; color: #1e40af; }
    .method-put { background: #fef3c7; color: #92400e; }
    .method-delete { background: #fee2e2; color: #991b1b; }

    .endpoint-path {
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      flex: 1;
    }

    .endpoint-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-weight: 500;
      display: none;
    }

    .endpoint-badge {
      font-size: 0.75rem;
      font-weight: 800;
      padding: 4px 10px;
      border: var(--border-width) solid var(--border-color);
      border-radius: 4px;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .badge-public { background: #ecfccb; }
    .badge-auth { background: #e0e7ff; }

    @media (min-width: 768px) {
      .endpoint-desc { display: block; }
    }

    /* ─── Code Blocks ─────────────────────────────────── */
    .code-block {
      background: var(--bg-code);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--radius);
      padding: 24px;
      box-shadow: var(--shadow-brutal);
      overflow-x: auto;
    }

    .code-block code {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      line-height: 1.6;
      color: #e2e8f0;
    }

    .code-block .comment { color: #94a3b8; font-style: italic; }
    .code-block .url { color: #f472b6; font-weight: 700; }
    .code-block .param { color: #fbbf24; }
    .code-block .string { color: #a7f3d0; }

    /* ─── Developer & Contribution Section ────────────── */
    .dev-profile {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 32px;
    }
    
    .dev-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .dev-avatar {
      width: 64px;
      height: 64px;
      background: #bfdbfe;
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      box-shadow: 2px 2px 0px var(--border-color);
    }

    .dev-info h3 {
      font-size: 1.4rem;
      margin-bottom: 4px;
    }
    
    .dev-info p {
      font-size: 0.95rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      margin-top: 12px;
      flex-wrap: wrap;
    }

    .brutal-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      background: #fff;
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 700;
      border: var(--border-width) solid var(--border-color);
      border-radius: 6px;
      box-shadow: 3px 3px 0px var(--border-color);
      transition: all 0.2s;
    }

    .brutal-btn:hover {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0px var(--border-color);
    }
    
    .brutal-btn svg { width: 20px; height: 20px; fill: currentColor; }
    .btn-github { background: #f8fafc; }
    .btn-linkedin { background: #eff6ff; }

    /* ─── Tech Stack ──────────────────────────────────── */
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
    }

    .tech-item {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      background: #fff;
    }

    .tech-item .tech-icon {
      font-size: 1.8rem;
    }

    .tech-item .tech-name {
      font-size: 1rem;
      font-weight: 800;
    }

    .tech-item .tech-role {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
    }

    /* ─── Footer ──────────────────────────────────────── */
    .footer {
      text-align: center;
      padding: 40px 0;
      margin-top: 40px;
      border-top: var(--border-width) solid var(--border-color);
      font-weight: 600;
      color: var(--text-secondary);
    }

    /* ─── Responsive ──────────────────────────────────── */
    @media (max-width: 640px) {
      .wrapper { padding: 40px 16px; }
      .endpoint-row { flex-direction: column; align-items: flex-start; gap: 12px; }
      .method { width: 100%; text-align: center; }
      .dev-header { flex-direction: column; text-align: center; }
      .action-buttons { justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- ────── Hero ────── -->
    <header class="hero">
      <div class="hero-badge">
        <span class="dot"></span>
        API Active &amp; Operational
      </div>
      <h1>Universal<br>Listing API</h1>
      <p>A robust, minimalist RESTful service for managing categories and listings with filtering, pagination, and JWT security.</p>
    </header>

    <!-- ────── Info Grid ────── -->
    <div class="info-grid">
      <div class="brutal-card info-item" style="background: #eff6ff;">
        <div class="label">Version</div>
        <div class="value">v1.0.0</div>
      </div>
      <div class="brutal-card info-item" style="background: #f0fdf4;">
        <div class="label">Status</div>
        <div class="value">Online</div>
      </div>
      <div class="brutal-card info-item" style="background: #fef2f2;">
        <div class="label">Auth Type</div>
        <div class="value">JWT Bearer</div>
      </div>
      <div class="brutal-card info-item" style="background: #fffbeb;">
        <div class="label">Base URL</div>
        <div class="value" style="font-size: 0.9rem;">${baseUrl}/api</div>
      </div>
    </div>

    <!-- ────── Authentication Endpoints ────── -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">🔐</div>
        <h2>Authentication</h2>
      </div>
      <div class="endpoint-group">
        <div class="endpoint-row">
          <span class="method method-post">POST</span>
          <span class="endpoint-path">/api/auth/login</span>
          <span class="endpoint-desc">Authenticate and receive JWT token</span>
          <span class="endpoint-badge badge-public">Public</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-get">GET</span>
          <span class="endpoint-path">/api/auth/me</span>
          <span class="endpoint-desc">Get current authenticated user</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
      </div>
    </section>

    <!-- ────── Category Endpoints ────── -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">📂</div>
        <h2>Categories</h2>
      </div>
      <div class="endpoint-group">
        <div class="endpoint-row">
          <span class="method method-get">GET</span>
          <span class="endpoint-path">/api/categories</span>
          <span class="endpoint-desc">List all categories</span>
          <span class="endpoint-badge badge-public">Public</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-get">GET</span>
          <span class="endpoint-path">/api/categories/:id</span>
          <span class="endpoint-desc">Get category by ID</span>
          <span class="endpoint-badge badge-public">Public</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-post">POST</span>
          <span class="endpoint-path">/api/categories</span>
          <span class="endpoint-desc">Create a new category</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-put">PUT</span>
          <span class="endpoint-path">/api/categories/:id</span>
          <span class="endpoint-desc">Update a category</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-delete">DELETE</span>
          <span class="endpoint-path">/api/categories/:id</span>
          <span class="endpoint-desc">Delete a category</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
      </div>
    </section>

    <!-- ────── Listing Endpoints ────── -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">📋</div>
        <h2>Listings</h2>
      </div>
      <div class="endpoint-group">
        <div class="endpoint-row">
          <span class="method method-get">GET</span>
          <span class="endpoint-path">/api/listings</span>
          <span class="endpoint-desc">List all listings (Search & Paginated)</span>
          <span class="endpoint-badge badge-public">Public</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-get">GET</span>
          <span class="endpoint-path">/api/listings/:id</span>
          <span class="endpoint-desc">Get listing by ID</span>
          <span class="endpoint-badge badge-public">Public</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-post">POST</span>
          <span class="endpoint-path">/api/listings</span>
          <span class="endpoint-desc">Create a new listing</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-put">PUT</span>
          <span class="endpoint-path">/api/listings/:id</span>
          <span class="endpoint-desc">Update a listing</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
        <div class="endpoint-row">
          <span class="method method-delete">DELETE</span>
          <span class="endpoint-path">/api/listings/:id</span>
          <span class="endpoint-desc">Delete a listing</span>
          <span class="endpoint-badge badge-auth">Protected</span>
        </div>
      </div>
    </section>

    <!-- ────── Search & Filter Examples ────── -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">🔍</div>
        <h2>Query Examples</h2>
      </div>
      <div class="code-block">
        <code>
<span class="comment"># Search by keyword</span>
<span class="url">GET</span> /api/listings?<span class="param">search</span>=toyota

<span class="comment"># Filter by category slug</span>
<span class="url">GET</span> /api/listings?<span class="param">category</span>=kendaraan

<span class="comment"># Pagination and Sorting</span>
<span class="url">GET</span> /api/listings?<span class="param">sort</span>=newest&<span class="param">page</span>=1&<span class="param">limit</span>=10
        </code>
      </div>
    </section>

    <!-- ────── Developer & Contribution ────── -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">👨‍💻</div>
        <h2>Support &amp; Contribution</h2>
      </div>
      <div class="brutal-card dev-profile">
        <div class="dev-header">
          <div class="dev-avatar">👨‍💻</div>
          <div class="dev-info">
            <h3>Muhamad Rifki Firdaus</h3>
            <p>Aspiring Software Engineer</p>
          </div>
        </div>
        <p style="font-weight: 500; color: var(--text-secondary); margin-top: 8px;">
          This API is actively maintained. Whether you've found a bug, want to request a feature, or are interested in contributing to the source code, feel free to connect with me.
        </p>
        <div class="action-buttons">
          <!-- Ganti link href di bawah dengan link aslimu -->
          <a href="https://github.com/rifkifrds" target="_blank" class="brutal-btn btn-github">
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/rifkifrds" target="_blank" class="brutal-btn btn-linkedin">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>

    <!-- ────── Tech Stack ────── -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">⚙️</div>
        <h2>Technology Stack</h2>
      </div>
      <div class="tech-grid">
        <div class="brutal-card tech-item">
          <span class="tech-icon">🟢</span>
          <div>
            <div class="tech-name">Node.js</div>
            <div class="tech-role">Runtime</div>
          </div>
        </div>
        <div class="brutal-card tech-item">
          <span class="tech-icon">⚡</span>
          <div>
            <div class="tech-name">Express.js</div>
            <div class="tech-role">Framework</div>
          </div>
        </div>
        <div class="brutal-card tech-item">
          <span class="tech-icon">🔷</span>
          <div>
            <div class="tech-name">Prisma ORM</div>
            <div class="tech-role">Database ORM</div>
          </div>
        </div>
        <div class="brutal-card tech-item">
          <span class="tech-icon">🐘</span>
          <div>
            <div class="tech-name">PostgreSQL</div>
            <div class="tech-role">Database</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ────── Footer ────── -->
    <footer class="footer">
      <p>Universal Listing Platform API &middot; Crafted with Code &amp; Coffee.</p>
    </footer>

  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
};