/**
 * Loading.tsx - 載入動畫元件
 * 使用 Tailwind CSS 建立載入動畫
 * 展示 Tailwind 的 animation 和 utility classes 使用
 */

/**
 * Loading 元件屬性介面
 */
interface LoadingProps {
  size?: "sm" | "md" | "lg"; // 載入動畫大小
  fullScreen?: boolean; // 是否全螢幕顯示
  message?: string; // 載入訊息
}

/**
 * Loading 元件
 * 顯示載入動畫和可選的訊息文字
 *
 * @param size - 動畫大小（預設 md）
 * @param fullScreen - 是否全螢幕顯示（預設 false）
 * @param message - 載入訊息文字
 * @returns JSX.Element - 載入動畫 UI
 */
export const Loading = ({
  size = "md",
  fullScreen = false,
  message,
}: LoadingProps) => {
  // 根據 size 設定旋轉圈圈的大小
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  // 載入動畫：旋轉的圓圈
  const spinner = (
    <div
      className={` ${sizeClasses[size]} border-brand-primary-500 animate-spin rounded-full border-t-transparent`}
      role="status"
      aria-label="載入中"
    />
  );

  // 如果是全螢幕模式
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        {spinner}
        {message && (
          <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
        )}
      </div>
    );
  }

  // 一般模式
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {spinner}
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );
};
