import { Space, Spin } from 'antd';

export const LoadingPage = () => {
    return (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm bg-white/30">
            <Spin size="large" />
        </div>
    )
}