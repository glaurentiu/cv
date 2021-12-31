import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  ImageRun
} from "docx";


export class DocumentCreator {
  public create([personal,experiences,education,skills,url]: Array<any>): Document {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: `${personal.firstName} ${personal.lastName}`,
            heading: HeadingLevel.TITLE
          }),
       
          this.createContactInfo(personal.phone,personal.address,personal.dateOfBirth),
            new Paragraph({
                children: [
                    new TextRun(personal.firstName),
                    new TextRun({
                        text: personal.lastName,
                        bold: true,
                    }),
                    new TextRun({
                        text: experiences.jobTitle,
                        bold: true,
                    }),
                ],
            }),
        ],
    }],
  });


    return doc;
  }


  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true
    });
  }
  public createContactInfo(
    phoneNumber: string,
    address: string,
    dateOfBirth: string,
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Telefon: ${phoneNumber} | E-mail: ${address} | Data nasterii: ${dateOfBirth}`
        )
      ]
    });
  }
}
