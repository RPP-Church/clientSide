import { Input, Spin } from 'antd';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';
import Button from '../../../../components/Button';
import { Notification } from '../../../../components/Notification';
import styled from 'styled-components';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

const NoteContainer = styled.div`
  .note {
    padding: 10px 0;
    border-bottom: 2px solid #b7b7b7;

    p {
      font-size: clamp(1.1em, 20vw, 1.2em);
      font-weight: 500;
      margin: 0;
      font-style: italic;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
    margin-block: 1em 0;
    align-items: center;
    div:first-child {
      display: block;
    }

    div:last-child {
      display: flex;
      gap: 10px;

      span {
        cursor: pointer;
      }
    }
    span {
      font-size: 0.8em;
      font-weight: 600;
      display: block;
    }

    @media screen and (min-width: 35em) {
      div:first-child {
        display: flex;
        gap: 10px;
      }
    }
  }
`;

const Btn = ({ text, onClick, loading, background }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        marginBlock: '.8em 0px',
      }}
    >
      <Button
        text={text}
        color={'white'}
        radius={'3px'}
        size={'.7em'}
        onClick={onClick}
        disable={loading}
        background={background}
      />
    </div>
  );
};

Btn.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
  background: propTypes.string,
  loading: propTypes.bool,
};

const NoteModal = ({
  state,
  setState,
  isLoading,
  saveMutate,
  loading,
  deleteMutate,
  deleteLoading,
  updateMutate,
  loadingUpdate,
}) => {
  return (
    <Modals
      open={state.open}
      width={'40%'}
      //   handleOK={handleSubmit}
      //   loading={isLoading}
      okText={'Create service'}
      footer={<Footer setState={setState} />}
      closeIcon={null}
    >
      {isLoading ? (
        'Loading'
      ) : (
        <div>
          {!state.showNote && (
            <Btn
              text={'Add Note'}
              onClick={() =>
                setState((p) => ({
                  ...p,
                  showNote: true,
                }))
              }
              loading={loading}
            />
          )}

          {state.showNote && (
            <AddNote
              state={state}
              setState={setState}
              loading={loading}
              saveMutate={saveMutate}
              updateMutate={updateMutate}
              loadingUpdate={loadingUpdate}
            />
          )}

          <NoteContainer>
            {state?.controls?.notes?.length > 0 ? (
              <>
                {state?.controls?.notes.map((item) => (
                  <>
                    <div key={item?._id} className='note'>
                      <p>{item.comment}</p>
                    </div>
                    <div className='controls'>
                      <div>
                        <span>CreatedBy: {item?.createdBy?.name}</span>
                        <span>
                          Date:{' '}
                          {item?.date
                            ? new Date(item.date).toLocaleString()
                            : ''}
                        </span>
                      </div>
                      <div>
                        <span
                          onClick={() => {
                            {
                              deleteMutate({
                                notedId: item._id,
                                memberId: state.memberId,
                              });

                              setState((p) => ({
                                ...p,
                                controls: {
                                  noteId: item._id,
                                },
                              }));
                            }
                          }}
                        >
                          {deleteLoading &&
                          state.controls?.notedId === item._id ? (
                            <Spin size='small' />
                          ) : (
                            <MdDeleteForever size={20} />
                          )}
                        </span>
                        <span
                          onClick={() =>
                            setState((p) => ({
                              ...p,
                              edit: true,
                              showNote: true,
                              controls: {
                                ...p.controls,
                                comment: item.comment,
                                noteId: item._id,
                              },
                            }))
                          }
                        >
                          <CiEdit size={20} />
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <p>No note found </p>
            )}
          </NoteContainer>
        </div>
      )}
    </Modals>
  );
};

export default NoteModal;

NoteModal.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  deleteMutate: propTypes.func,
  saveMutate: propTypes.func,
  isLoading: propTypes.bool,
  loading: propTypes.bool,
  updateMutate: propTypes.func,
  loadingUpdate: propTypes.bool,
  deleteLoading: propTypes.bool,
};

const AddNote = ({
  state,
  setState,
  loading,
  saveMutate,
  updateMutate,
  loadingUpdate,
}) => {
  return (
    <div>
      <Input.TextArea
        rows={4}
        onChange={(e) =>
          setState((p) => ({
            ...p,
            controls: {
              ...p.controls,
              comment: e.target.value,
            },
          }))
        }
        placeholder='Enter note'
        value={state.controls.comment}
      />
      <div
        className=''
        style={{ display: 'flex', justifyContent: 'end', gap: '5px' }}
      >
        <Btn
          text={'Cancel'}
          onClick={() => {
            setState((p) => ({
              ...p,
              showNote: false,
              edit: false,
              controls: {
                ...p.controls,
                comment: '',
              },
            }));
          }}
          loading={loading}
          background='red'
        />
        <Btn
          text={
            loading || loadingUpdate
              ? 'Saving'
              : state?.edit
              ? 'Update Note'
              : 'Add Note'
          }
          onClick={() => {
            if (state.controls?.comment?.length > 2) {
              const data = {
                memberId: state.memberId,
                comment: state.controls.comment,
              };
              if (state?.edit) {
                const formdata = {
                  noteId: state.controls?.noteId,
                  comment: state.controls.comment,
                };

                updateMutate({ memberId: state.memberId, formdata });
                return;
              }
              saveMutate(data);
            } else {
              Notification({
                type: 'warning',
                message: 'Enter note to add',
              });
            }
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

AddNote.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  saveMutate: propTypes.func,
  loading: propTypes.bool,
  updateMutate: propTypes.func,
  loadingUpdate: propTypes.bool,
};

const Footer = ({ setState }) => {
  return (
    <div style={{ borderTop: '2px solid #b7b7b7', marginTop: '1em' }}>
      <span
        style={{
          cursor: 'pointer',
          color: 'blue',
          fontWeight: '600',
          marginTop: '1em',
        }}
        onClick={() =>
          setState((p) => ({
            ...p,
            open: false,
            showNote: false,
            memberId: null,
            controls: {
              comment: '',
              notes: [],
            },
          }))
        }
      >
        Close
      </span>
    </div>
  );
};

Footer.propTypes = {
  setState: propTypes.func,
};
