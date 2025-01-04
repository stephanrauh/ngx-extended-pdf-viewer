`ngx-extended-pdf-viewer` supports XFA forms. These forms are organizing their fields in a tree structure. This tree structure shows in the field names reported by `(formData)`. The field names are inspired by the field names the Java library iText uses, but without the array indexes.

In contrast, `[formData]` optionally allows you to use the unqualified field name (i.e. only the last part of the name). Of course, two-way binding converts this field name to a fully qualified name in `(formData)`. 

**Note**: If the field name matches several fields, the PDF viewer populates a random field. Or even all of them simultaneously. Do yourself a favor and avoid the ambiguity.

Unfortunately I cannot set up a demo, because until now, I've failed to find or create a demo file with a liberal license. I apologize for the inconvenience.
