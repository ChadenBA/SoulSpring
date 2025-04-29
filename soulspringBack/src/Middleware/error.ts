import { Request, Response, NextFunction } from "express";

// 404 Not Found Middleware
const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Global Error Handler Middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

export { notFound, errorHandler };

// import { Request, Response, NextFunction } from "express";

// // 404 Not Found Middleware
// const notFound = (req: Request, res: Response, next: NextFunction): void => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// };

// // Global Error Handler Middleware
// const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode).json({
//         message: err.message,
//         stack: process.env.NODE_ENV === "production" ? null : err.stack
//     });
// };

// export { notFound, errorHandler };
