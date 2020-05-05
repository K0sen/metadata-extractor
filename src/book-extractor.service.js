const makeBook = ({ bookRepository, readFile, parseXmlToJson, getValueFromObject }) => {
  const handleBook = async (bookPath) => {
    const bookContent = await readFile(bookPath);
    const parsedBookContent = await parseXmlToJson(bookContent);
    await bookRepository.create(transformJSONToBookObject(parsedBookContent));
  }

  const transformJSONToBookObject = jsonObject => ({
    title: getValueFromObject(jsonObject, 'rdf:RDF.pgterms:ebook.0.dcterms:title.0'),
    author: getValueFromObject(jsonObject, 'rdf:RDF.pgterms:ebook.0.dcterms:creator.0.pgterms:agent.0.pgterms:alias.0'),
    publisher: getValueFromObject(jsonObject, 'rdf:RDF.pgterms:ebook.0.dcterms:publisher.0'),
    publicationDate: getValueFromObject(jsonObject, 'rdf:RDF.pgterms:ebook.0.dcterms:issued.0._'),
    language: getValueFromObject(jsonObject, 'rdf:RDF.pgterms:ebook.0.dcterms:language.0.rdf:Description.0.rdf:value.0._'),
    licenseRights: getValueFromObject(jsonObject, 'rdf:RDF.pgterms:ebook.0.dcterms:rights.0'),
  });

  return {
    handleBook,
    transformJSONToBookObject,
  }
}


module.exports = makeBook;