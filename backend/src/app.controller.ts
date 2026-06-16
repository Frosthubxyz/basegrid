import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }

  @Get('stats')
  getStats(): { activeNodes: number; tasksCompleted: number; totalRewardsPaid: string } {
    return {
      activeNodes: 142,
      tasksCompleted: 8593,
      totalRewardsPaid: '15.4 ETH'
    };
  }
}
