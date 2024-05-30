import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

    constructor(private readonly configService: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        console.log(this.configService.get<string>('NOSQL_URI'))
        return {
            uri: 'mongodb+srv://user:123@cluster0.o8tkeem.mongodb.net/contact?retryWrites=true&w=majority&appName=Cluster0',
        };
    }

}