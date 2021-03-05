interface ExportForm {
  subjectPhotosType: string
  subjectListingSheets: boolean
  comparableType: string
  selectedCompPhotosType: string | null
  selectedCompListingSheets: boolean
  allCompPhotosType: string | null
  allCompListingSheets: boolean
  uncheckedManualComparables: boolean
}

export const exportPdf = async (
  emailList: string[],
  exportForm: ExportForm
): Promise<string> => {
  return 'Request Submitted!'
}

interface UploadFileInterface {
  filename: string
  file: File
}

export const uploadAdditionalDocuments = async (
  uploadForm: UploadFileInterface
): Promise<string> => {
  return 'File succesfully uploaded.'
}
