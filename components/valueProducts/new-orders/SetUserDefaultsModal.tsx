import Modal from 'components/common/Modal'
import Link from 'next/link'

interface Props {
  closeModal: () => void
}

export default function SetUserDefaultsModal({ closeModal }: Props) {
  return (
    <Modal closeModal={closeModal} title="Set User Defaults" width={600}>
      <p>
        You're about to leave the Submit Order page and lose all progress. Would
        you like to continue?
      </p>
      <p></p>
      <Link href="/profile/filter-defaults">
        <button className="btn my-4">Yes</button>
      </Link>
      <button className="btn btn-link" onClick={() => closeModal()}>
        Cancel
      </button>
    </Modal>
  )
}
