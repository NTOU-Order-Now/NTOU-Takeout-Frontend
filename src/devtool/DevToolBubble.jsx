import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
const DevToolBubble = ({ router, endPointReplacements = {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const bubbleRef = useRef(null);
    const wasDragging = useRef(false);

    const extractRoutes = (routes, parentPath = '') => {
        return routes.flatMap(route => {
            const normalizedParentPath = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
            const normalizedCurrentPath = route.path?.startsWith('/') ? route.path : `/${route.path || ''}`;
            const fullPath = route.path ? `${normalizedParentPath}${normalizedCurrentPath}` : '';

            const result = fullPath ? [fullPath] : [];

            if (route.children) {
                return [...result, ...extractRoutes(route.children, fullPath)];
            }

            return result;
        }).filter(route => route !== '');
    };

    // 提取并规范化路由
    const allRoutes = extractRoutes(router.routes)
        .map(route => route.startsWith('//') ? route.slice(1) : route)
        .map(route => route.startsWith('/') ? route.slice(1) : route);

    const handleMouseDown = (e) => {
        if (bubbleRef.current && bubbleRef.current.contains(e.target)) {
            setIsDragging(true);
            wasDragging.current = false;
            const rect = bubbleRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            e.preventDefault();
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            wasDragging.current = true;
            const newX = Math.max(0, Math.min(window.innerWidth - 64, e.clientX - dragOffset.x));
            const newY = Math.max(0, Math.min(window.innerHeight - 64, e.clientY - dragOffset.y));

            setPosition({
                x: newX,
                y: newY
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const replaceParams = (route) => {
        return route.replace(/:(\w+)/g, (_, param) => {
            return endPointReplacements[param] || `:${param}`;
        });
    };

    const handleRouteClick = (route) => {
        const processedRoute = replaceParams(route);
        const basename = "/Order-Now-Frontend";
        // 确保路径之间有正确的斜线
        const fullPath = `${window.location.origin}${basename}/${processedRoute}`;
        window.location.href = fullPath;
        setIsOpen(false);
    };

    const handleBubbleClick = (e) => {
        if (!wasDragging.current && e.target.tagName === 'BUTTON' && e.target.innerText === '🧭') {
            setIsOpen(true);
        }
        wasDragging.current = false;
    };

    return (
        <div
            ref={bubbleRef}
            className="fixed z-50"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                touchAction: 'none'
            }}
            onMouseDown={handleMouseDown}
            onClick={handleBubbleClick}
            onTouchStart={(e) => {
                const touch = e.touches[0];
                handleMouseDown({
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                    preventDefault: () => e.preventDefault(),
                    target: e.target
                });
            }}
        >
            <div className={`
        ${isOpen ? 'w-64 h-96' : 'w-12 h-12'}
        bg-gray-800 rounded-lg shadow-lg transition-all duration-200
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
      `}>
                {isOpen ? (
                    <div className="p-4 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-semibold">Route Navigator</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {allRoutes.map((route, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRouteClick(route);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                                >
                                    {route}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button
                        className="w-full h-full flex items-center justify-center text-white"
                    >
                        🧭
                    </button>
                )}
            </div>
        </div>
    );
};

DevToolBubble.propTypes = {
    router: PropTypes.object.isRequired,
    endPointReplacements: PropTypes.object
};
export default DevToolBubble;