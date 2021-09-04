export class TextUtil {
  static getFullText(code: string)
  {
    if (code==="A")
    {
      return "Activo";
    }
   else if (code==="I")
    {
      return "Inactivo";
    }

    return code;
  }
}

