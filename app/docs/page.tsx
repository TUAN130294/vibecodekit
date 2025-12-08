'use client';

/**
 * Interactive API Documentation Page
 *
 * For "người trần mắt thịt" (regular people) - no technical jargon, just simple explanations
 */

import { useState } from 'react';

// Types for API endpoints
interface APIEndpoint {
  method: string;
  path: string;
  title: string;
  description: string;
  requiresAuth: boolean;
  request?: {
    headers?: { [key: string]: string };
    body?: any;
    params?: { [key: string]: string };
    query?: { [key: string]: string };
  };
  response: {
    success: any;
    error?: any;
  };
  example: {
    curl: string;
    javascript: string;
  };
}

export default function DocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('health');
  const [activeTab, setActiveTab] = useState<'overview' | 'try-it' | 'code'>('overview');

  // API Endpoints Configuration
  const endpoints: { [key: string]: APIEndpoint } = {
    health: {
      method: 'GET',
      path: '/api/health',
      title: 'Health Check',
      description: 'Kiểm tra xem server có đang hoạt động không. Dùng để test connection.',
      requiresAuth: false,
      response: {
        success: {
          success: true,
          data: {
            status: 'ok',
            timestamp: '2024-01-01T00:00:00.000Z',
            uptime: 123.456,
            environment: 'development'
          }
        }
      },
      example: {
        curl: `curl http://localhost:3000/api/health`,
        javascript: `// Vanilla JavaScript
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Async/Await
const checkHealth = async () => {
  const response = await fetch('/api/health');
  const data = await response.json();
  console.log(data);
};`
      }
    },
    login: {
      method: 'POST',
      path: '/api/auth/login',
      title: 'Đăng nhập',
      description: 'Đăng nhập để lấy JWT token. Token này dùng để gọi các API cần xác thực.',
      requiresAuth: false,
      request: {
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: 'user@example.com',
          password: 'password123'
        }
      },
      response: {
        success: {
          success: true,
          data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        },
        error: {
          success: false,
          error: 'Email and password required',
          code: 'INVALID_INPUT'
        }
      },
      example: {
        curl: `curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"password123"}'`,
        javascript: `// Đăng nhập và lưu token
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.success) {
    // Lưu token vào localStorage
    localStorage.setItem('token', data.data.token);
    console.log('Đăng nhập thành công!');
  } else {
    console.error('Lỗi:', data.error);
  }
};

login('user@example.com', 'password123');`
      }
    },
    getTasks: {
      method: 'GET',
      path: '/api/tasks',
      title: 'Lấy danh sách tasks',
      description: 'Lấy tất cả tasks với phân trang. Có thể lọc theo status.',
      requiresAuth: false,
      request: {
        query: {
          page: '1',
          limit: '20',
          status: 'OPEN | IN_PROGRESS | COMPLETED | CANCELLED'
        }
      },
      response: {
        success: {
          success: true,
          data: {
            tasks: [
              {
                id: '1',
                title: 'Setup development environment',
                description: 'Install Node.js, Docker, and configure IDE',
                status: 'COMPLETED',
                priority: 'high',
                createdAt: '2024-01-01T00:00:00.000Z'
              }
            ],
            total: 1,
            page: 1,
            limit: 20
          }
        }
      },
      example: {
        curl: `curl "http://localhost:3000/api/tasks?page=1&limit=10&status=OPEN"`,
        javascript: `// Lấy tasks với filter
const getTasks = async (page = 1, status = null) => {
  let url = \`/api/tasks?page=\${page}&limit=20\`;
  if (status) {
    url += \`&status=\${status}\`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.success) {
    console.log('Tasks:', data.data.tasks);
    console.log('Total:', data.data.total);
  }
};

getTasks(1, 'OPEN'); // Lấy tasks OPEN ở trang 1`
      }
    },
    createTask: {
      method: 'POST',
      path: '/api/tasks',
      title: 'Tạo task mới',
      description: 'Tạo một task mới với title bắt buộc, description và priority tùy chọn.',
      requiresAuth: false,
      request: {
        headers: { 'Content-Type': 'application/json' },
        body: {
          title: 'New task',
          description: 'Task description (optional)',
          priority: 'high | medium | low'
        }
      },
      response: {
        success: {
          success: true,
          data: {
            id: '3',
            title: 'New task',
            description: 'Task description',
            status: 'OPEN',
            priority: 'high',
            createdAt: '2024-01-01T00:00:00.000Z'
          }
        }
      },
      example: {
        curl: `curl -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title":"New task","priority":"high"}'`,
        javascript: `// Tạo task mới
const createTask = async (title, description, priority = 'medium') => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, priority })
  });

  const data = await response.json();

  if (data.success) {
    console.log('Task created:', data.data);
    return data.data;
  } else {
    console.error('Error:', data.error);
  }
};

createTask('Implement login', 'Add JWT authentication', 'high');`
      }
    },
    protected: {
      method: 'GET',
      path: '/api/protected',
      title: 'Protected Route Example',
      description: 'Ví dụ về API cần xác thực. Phải gửi JWT token trong Authorization header.',
      requiresAuth: true,
      request: {
        headers: {
          'Authorization': 'Bearer <token>'
        }
      },
      response: {
        success: {
          success: true,
          data: {
            message: 'You are authenticated!',
            user: {
              id: 'user@example.com',
              role: 'user'
            }
          }
        },
        error: {
          success: false,
          error: 'Unauthorized',
          code: 'UNAUTHORIZED'
        }
      },
      example: {
        curl: `curl http://localhost:3000/api/protected \\
  -H "Authorization: Bearer <your-token>"`,
        javascript: `// Gọi protected API với token
const callProtectedAPI = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Chưa đăng nhập! Cần login trước.');
    return;
  }

  const response = await fetch('/api/protected', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  const data = await response.json();

  if (data.success) {
    console.log('User info:', data.data.user);
  } else {
    console.error('Error:', data.error);
  }
};

callProtectedAPI();`
      }
    }
  };

  const currentEndpoint = endpoints[selectedEndpoint];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📚 API Documentation
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Hướng dẫn sử dụng API cho người mới bắt đầu - Đơn giản, dễ hiểu, có ví dụ
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - List of endpoints */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Endpoints
              </h2>

              <div className="space-y-2">
                {Object.entries(endpoints).map(([key, endpoint]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedEndpoint(key);
                      setActiveTab('overview');
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedEndpoint === key
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{endpoint.title}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          endpoint.method === 'GET'
                            ? 'bg-green-100 text-green-700'
                            : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-700'
                            : endpoint.method === 'PUT'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                    </div>
                    {endpoint.requiresAuth && (
                      <div className="mt-1 flex items-center text-xs">
                        <span className="text-yellow-500">🔒 Cần token</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  💡 Quick Tips
                </h3>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Nhấn vào endpoint để xem chi tiết</li>
                  <li>• Tab "Try it" để test ngay</li>
                  <li>• Copy code ở tab "Code"</li>
                  <li>• Server local: localhost:3000</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    📖 Tổng quan
                  </button>
                  <button
                    onClick={() => setActiveTab('try-it')}
                    className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                      activeTab === 'try-it'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    🚀 Try It
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                      activeTab === 'code'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    💻 Code
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`px-3 py-1 rounded-md font-semibold ${
                            currentEndpoint.method === 'GET'
                              ? 'bg-green-100 text-green-700'
                              : currentEndpoint.method === 'POST'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {currentEndpoint.method}
                        </span>
                        <code className="text-lg font-mono bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md text-gray-900 dark:text-white">
                          {currentEndpoint.path}
                        </code>
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {currentEndpoint.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {currentEndpoint.description}
                      </p>
                    </div>

                    {currentEndpoint.requiresAuth && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex items-start">
                          <span className="text-2xl mr-3">🔒</span>
                          <div>
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                              Cần xác thực
                            </h3>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              API này cần JWT token. Đăng nhập trước tại /api/auth/login để lấy token.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Request */}
                    {currentEndpoint.request && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          📥 Request
                        </h3>

                        {currentEndpoint.request.headers && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Headers:
                            </h4>
                            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                              {JSON.stringify(currentEndpoint.request.headers, null, 2)}
                            </pre>
                          </div>
                        )}

                        {currentEndpoint.request.body && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Body (JSON):
                            </h4>
                            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                              {JSON.stringify(currentEndpoint.request.body, null, 2)}
                            </pre>
                          </div>
                        )}

                        {currentEndpoint.request.query && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Query Parameters:
                            </h4>
                            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                              {JSON.stringify(currentEndpoint.request.query, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Response */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        📤 Response
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                            ✅ Success (200/201):
                          </h4>
                          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                            {JSON.stringify(currentEndpoint.response.success, null, 2)}
                          </pre>
                        </div>

                        {currentEndpoint.response.error && (
                          <div>
                            <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                              ❌ Error (400/401/404/500):
                            </h4>
                            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                              {JSON.stringify(currentEndpoint.response.error, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Try It Tab */}
                {activeTab === 'try-it' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">💡</span>
                        <div>
                          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                            Coming Soon!
                          </h3>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Interactive API tester đang được phát triển. Hiện tại bạn có thể dùng cURL hoặc Postman để test.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        🔧 Test với cURL
                      </h3>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {currentEndpoint.example.curl}
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentEndpoint.example.curl);
                          alert('Đã copy cURL command!');
                        }}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        📋 Copy cURL
                      </button>
                    </div>
                  </div>
                )}

                {/* Code Tab */}
                {activeTab === 'code' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        JavaScript / TypeScript
                      </h3>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {currentEndpoint.example.javascript}
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentEndpoint.example.javascript);
                          alert('Đã copy code!');
                        }}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        📋 Copy Code
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        💡 Tips:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Copy code và paste vào project của bạn</li>
                        <li>• Thay đổi URL nếu deploy lên production</li>
                        <li>• Thêm error handling cho production code</li>
                        <li>• Dùng TypeScript để có type safety</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📚 Tài liệu thêm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/api/README.md"
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Next.js API Routes Guide
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hướng dẫn chi tiết về Next.js API Routes
                  </p>
                </a>
                <a
                  href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Next.js Official Docs
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Documentation chính thức từ Next.js
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
