import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  ImageRun,
} from 'docx';

export class DocumentCreator {
  educatie = 'Educatie';
  public create([
    personal,
    experiences,
    education,
    skills,
    url,
  ]: Array<any>): Document {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: `${personal.firstName} ${personal.lastName}`,
              heading: HeadingLevel.TITLE,
            }),

            this.createContactInfo(
              personal.phone,
              personal.address,
              personal.dateOfBirth
            ),
            this.createHeading(this.educatie),
            ...education
              .map((education: any) => {
                const arr: Paragraph[] = [];
                arr.push(
                  this.createInstitutionHeader(
                    education.schoolName,
                    `${education.startYear} - ${education.endYear}`
                  )
                );
                arr.push(
                  this.createRoleText(
                    `${education.domain} - ${education.degree}`
                  )
                );
                return arr;
              })
              .reduce((prev: any, curr: any) => prev.concat(curr), []),
              this.createHeading("Experienta"),
              ...experiences
                .map((experiences:any) => {
                  const arr: Paragraph[] = [];

                  arr.push(
                    this.createInstitutionHeader(
                      experiences.company,
                      this.createPositionDateText(
                        experiences.startYear,
                        experiences.endYear,
                      )
                    )
                  );
                  arr.push(this.createRoleText(experiences.jobTitle));

                        arr.push(new Paragraph({
                          text:experiences.description
                        }));



                  return arr;
                })
                .reduce((prev:any, curr:any) => prev.concat(curr), []),
                this.createHeading("Skills"),
                this.createSkillList(skills),
          ],
        },
      ],
    });

    return doc;
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
    });
  }
  public createContactInfo(
    phoneNumber: string,
    address: string,
    dateOfBirth: string
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Telefon: ${phoneNumber} | E-mail: ${address} | Data nasterii: ${dateOfBirth}`
        ),
      ],
    });
  }


  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }
  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }
  public createPositionDateText(
    startDate: any,
    endDate: any,
  ): string {
    return `${startDate} - ${endDate}`;
  }
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map(skill => skill.skill).join(", ") + ".")]
    });
  }

}
