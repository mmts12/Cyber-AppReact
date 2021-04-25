import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import moment from 'moment';

export function exportDoc(attack) {

    const doc = new Document({
        sections: [{
            properties: {},
            children: [

                new Paragraph({
                    children: [
                        new TextRun({ text: `${attack.objects[0].name} Attack`, bold: true, color: "blue", font: "Segoe UI" }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "ID: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: ` ${attack.objects[0].id}`, bold: true, font: "Segoe UI" }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Platforms: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: ` ${attack.objects[0].x_mitre_platforms.toString()}`, bold: true, font: "Segoe UI" }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Created: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: ` ${moment(attack.objects[0].created).calendar()}`, bold: true, font: "Segoe UI" }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Modified: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: ` ${moment(attack.objects[0].modified).calendar()}`, bold: true, font: "Segoe UI" }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Phase name: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: ` ${attack.objects[0].kill_chain_phases[0].phase_name}`, font: "Segoe UI" })
                    ]
                }),
                new Paragraph({
                    spacing: {
                        before: 300,
                    },
                    children: [
                        new TextRun({ text: "Description: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: ` ${attack.objects[0].description}`, font: "Segoe UI" }),
                    ]
                },
                ),
                new Paragraph({
                    spacing: {
                        before: 300,
                    },
                    children: [
                        new TextRun({ text: "Detection: ", bold: true, font: "Segoe UI" }),
                        new TextRun({ text: `  ${attack.objects[0].x_mitre_detection}`, font: "Segoe UI" })
                    ]
                })
            ],
        }],
    });



    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${attack.objects[0].name}.docx`);
        console.log("Document created successfully");
    });
}
