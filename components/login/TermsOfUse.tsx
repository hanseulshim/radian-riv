const TermsOfUse: React.FC = () => (
  <div className="terms-of-use">
    <h4>Terms of Use:</h4>
    <object
      data={`${process.env.baseUrl}/TermsOfUse.pdf`}
      type="application/pdf"
      width="100%"
      height="300px"
    />
  </div>
)

export default TermsOfUse
