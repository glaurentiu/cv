import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from "docx";

export class DocumentCreator {
  public create([personal,experiences,skills,education,url]: Array<any>): Document {
    const doc = new Document({
      sections: [{
          properties: {},
          children: [
              new Paragraph({
                  children: [
                      new TextRun('Hello'),
                  ],
              }),
          ],
      }],
  });


    return doc;
  }
}
