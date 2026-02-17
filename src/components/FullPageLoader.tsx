
const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default FullPageLoader