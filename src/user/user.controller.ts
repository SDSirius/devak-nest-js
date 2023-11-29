import { Controller, Get, Request, BadRequestException, Body, Put, HttpCode, HttpStatus, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { UserMessagesHelper } from './helpers/messages.helper';
import { UserService } from './user.service'
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { uploadToS3 }  from '../cars/utils/uploadToS3.util'
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @IsPublic()
    async getUser(@Request() req) {
        const { userId } = req?.user;
        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND);
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.file,
            id: user._id
        }
    }

    @Get(':id')
    @IsPublic()
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.getUserById(id)

        if (!user) {
            throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND)
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.file,
            id: user._id
        }
    }
 
    @Put()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    async updateUser(@Request() req, @Body() dto: UpdateUserDto,@UploadedFile() file: any) {
        let urlFile = " ";
        if (file) {
            const folderName = process.env.CAR_FOLDER_NAME;
            const result = await uploadToS3(file, folderName);
            if (typeof result === 'string') {
                urlFile = result;
            } 
        } else {
            urlFile = dto.file;
        }
        const { userId } = req?.user;
        await this.userService.updateUser(userId, dto, urlFile as string);
    }
}