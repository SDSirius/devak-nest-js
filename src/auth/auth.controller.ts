import {Controller, Post, HttpCode, HttpStatus, Body ,UseInterceptors, UploadedFile} from '@nestjs/common'
import { RegisterDto } from 'src/user/dtos/register.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/ispublic.decorator';
import { LoginDto } from './dtos/login.dto';
import { uploadToS3 }  from '../cars/utils/uploadToS3.util'
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    @UseInterceptors(FileInterceptor('file'))
    async register(@Body() dto: RegisterDto,@UploadedFile() file: any) {
        const folderName = process.env.USER_FOLDER_NAME
        const urlfile = await uploadToS3(file, folderName);
        return this.authService.register(dto, urlfile as string);
    }
}