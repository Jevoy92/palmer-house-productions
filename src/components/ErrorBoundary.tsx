import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
      // Example: logErrorToService(error, errorInfo);
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-corporate-light px-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              {/* Error Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-6">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>

              {/* Error Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-corporate-dark mb-4">
                Oops! Something went wrong
              </h1>

              {/* Error Description */}
              <p className="text-lg text-corporate-gray mb-8">
                We encountered an unexpected error. Don't worry, our team has been notified 
                and we're working to fix it.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 text-left bg-muted rounded-lg p-4">
                  <summary className="cursor-pointer font-semibold text-corporate-dark mb-2">
                    Technical Details (Development Only)
                  </summary>
                  <div className="text-sm text-corporate-gray space-y-2">
                    <p className="font-mono bg-white p-2 rounded border border-gray-200 overflow-auto">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="bg-white p-2 rounded border border-gray-200 overflow-auto text-xs">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={this.handleReset}
                  className="min-h-[44px] px-6"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                
                <Button
                  onClick={this.handleReload}
                  className="min-h-[44px] px-6"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  className="min-h-[44px] px-6"
                  variant="secondary"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Support Message */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-corporate-gray">
                  If this problem persists, please{' '}
                  <a 
                    href="mailto:info@palmerhouseproductions.com" 
                    className="text-primary hover:underline font-semibold"
                  >
                    contact our support team
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
