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


  static estado(code: string)
  {
    if (code==="P")
    {
      return "Procesado";
    }

    return code;
  }
}

