import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "abbreviate" })
export class AbbreviatePipe implements PipeTransform {
	transform(value: string, word: string): string {
		return value.replace(new RegExp(`${word}\\w+`, "g"), `${word}.`);
	}
}
