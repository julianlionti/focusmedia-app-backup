import { StringMap, TOptions } from 'i18next'
import { AlertDialog, Button, Text } from 'native-base'
import React, { useRef } from 'react'
import { useT } from '../../translations'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string | TOptions<StringMap> | undefined | JSX.Element
  description: string | TOptions<StringMap> | undefined | JSX.Element
  actionBtn: JSX.Element
  noCancel?: boolean
}

const CustomModal: React.FC<Props> = (props) => {
  const t = useT()
  const { isOpen, onClose, title, description, actionBtn, noCancel } = props
  const cancelRef = useRef(null)
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>
          <Text>{description?.toString()}</Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            {!noCancel ? (
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                {t('cancel')?.toString()}
              </Button>
            ) : (
              <></>
            )}
            {actionBtn}
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export default CustomModal
