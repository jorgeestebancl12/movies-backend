// Core
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Create and export de class Documentation
export default class Documentation {
  /**
   * constructor
   * @description First call where the class create
   * @param  {INestApplication} application
   * @param  {string} url
   */
  constructor(application: INestApplication, url: string) {
    /**
     * Documentation swagger
     * Add the documentation of swagger with the title, description and the version
     */
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Movies')
      .setDescription('Movies services')
      .setVersion('1.0')
      .build();

    // Add custom CSS to remove the top bar
    const options = {
      customCss: `.swagger-ui .topbar { display: none }`,
    };

    // Apply configuration in swagger
    const document = SwaggerModule.createDocument(application, config);

    // Apply options
    SwaggerModule.setup(url, application, document, options);
  }
}
