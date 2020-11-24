const TermsOfUse: React.FC = () => (
  <>
    <h4>Terms of Use:</h4>
    <object
      data={`${process.env.baseUrl}/TermsOfUse.pdf`}
      type="application/pdf"
      width="100%"
      height="300px"
    />
  </>
)

export default TermsOfUse
