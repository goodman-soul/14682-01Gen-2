import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ModuleErrorBoundaryProps {
  children: ReactNode;
  moduleName?: string;
  className?: string;
}

interface ModuleErrorBoundaryState {
  hasError: boolean;
}

export class ModuleErrorBoundary extends Component<
  ModuleErrorBoundaryProps,
  ModuleErrorBoundaryState
> {
  public state: ModuleErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ModuleErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      `[ModuleErrorBoundary] Error in module "${this.props.moduleName || 'unknown'}":`,
      error,
      errorInfo
    );
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      const { moduleName, className } = this.props;

      return (
        <div
          className={`bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] ${className || ''}`}
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-slate-400" />
          </div>

          <h3 className="text-sm font-medium text-slate-600 mb-1">
            {moduleName ? `${moduleName}模块` : '模块'}加载失败
          </h3>

          <p className="text-xs text-slate-400 mb-4">
            暂时无法加载此模块的内容
          </p>

          <button
            onClick={this.handleRetry}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
