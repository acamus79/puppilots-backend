export class EmailDto{
  from: string
  to: string
  subject: string
  html: string
  substitutions: {[Key: string]: string} = {}
  attachments: Attachment[]
}

class Attachment{
  id: string
  filename: string
  disposition: 'inline' | 'attachment'
  content: string
}
