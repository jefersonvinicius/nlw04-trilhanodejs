import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export class TemplateBuilder {
  static buildSurveyTemplate(data: SurveyTemplateData) {
    const templateContent = fs.readFileSync(path.resolve(__dirname, '..', 'views', 'emails', 'survey.html'));
    const template = handlebars.compile(templateContent.toString('utf8'));
    return template(data);
  }
}

type SurveyTemplateData = {
  evaluationId: string;
  baseURL: string;
};
