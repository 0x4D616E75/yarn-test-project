import { AppService } from './app.service.js';
import { type ApiResponse } from '@test-project/shared-lib';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): ApiResponse<string>;
    getHealth(): ApiResponse<{
        status: string;
        timestamp: Date;
    }>;
}
//# sourceMappingURL=app.controller.d.ts.map