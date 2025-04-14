import { Request, Response, NextFunction } from "express";

interface Pagination {
    page: number;
    itemsPerPage: number;
}

// Extend Express Request interface to include our pagination property.
declare global {
    namespace Express {
        interface Request {
            pagination?: Pagination;
        }
    }
}

class PaginationMiddleware {
    defaultItemsPerPage: number;

    constructor(defaultItemsPerPage: number = 10) {
        this.defaultItemsPerPage = defaultItemsPerPage;
    }

    middleware = (req: Request, res: Response, next: NextFunction) => {
        // Parse and provide fallback if NaN or less than 1.
        const page = parseInt(req.query.page as string, 10);
        const itemsPerPage = parseInt(req.query.itemsPerPage as string, 10);

        req.pagination = {
            page: !isNaN(page) && page > 0 ? page : 1,
            itemsPerPage: !isNaN(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : this.defaultItemsPerPage,
        };

        next();
    };
}

export default new PaginationMiddleware();
