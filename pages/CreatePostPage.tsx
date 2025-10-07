import { ArrowLeft, Paperclip, Image as ImageIcon, Video, Camera, X } from 'lucide-react';
import { useState, useRef } from 'react';
import sendIconImage from 'figma:asset/1c8916258b4a83432e6ac48d710936cd1915bc21.png';

interface CreatePostPageProps {
  onBack: () => void;
  onPost?: (title: string, description: string, mediaUrl?: string, mediaType?: 'image' | 'video') => void;
}

type EditingField = 'title' | 'description' | null;

export function CreatePostPage({ onBack, onPost }: CreatePostPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [mediaFile, setMediaFile] = useState<{ type: 'image' | 'video'; url: string; file: File } | null>(null);
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  
  // Refs for hidden file inputs
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const libraryInputRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    if (!title || !description) {
      alert('Please add a title and description for your post');
      return;
    }
    
    // Save the post
    if (onPost) {
      onPost(title, description, mediaFile?.url, mediaFile?.type);
    }
    
    console.log('Creating post:', { title, description, media: mediaFile });
    alert('Post created successfully! 🎉');
    onBack();
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    if (editingField === 'title') {
      setTitle(inputValue);
    } else if (editingField === 'description') {
      setDescription(inputValue);
    }

    setInputValue('');
    setEditingField(null);
  };

  const handleTitleClick = () => {
    setEditingField('title');
    setInputValue(title);
  };

  const handleDescriptionClick = () => {
    setEditingField('description');
    setInputValue(description);
  };

  const handleMediaUpload = (source: 'camera' | 'library') => {
    setShowMediaOptions(false);
    
    if (source === 'camera') {
      // Trigger camera input
      cameraInputRef.current?.click();
    } else {
      // Trigger library input
      libraryInputRef.current?.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image or video
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Please select an image or video file');
      return;
    }

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    
    setMediaFile({
      type: isImage ? 'image' : 'video',
      url,
      file
    });

    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  const removeMedia = () => {
    if (mediaFile) {
      URL.revokeObjectURL(mediaFile.url);
      setMediaFile(null);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Create Post</h1>
        </div>
        <button
          onClick={handlePost}
          className="px-6 py-2 rounded-full font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
          }}
        >
          Post
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={libraryInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        {/* Media Upload Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowMediaOptions(true)}
            className="w-full py-4 rounded-xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-2"
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-white/60" />
              <Video className="w-6 h-6 text-white/60" />
            </div>
            <span className="text-white/60 text-sm">Add Photo or Video</span>
          </button>
        </div>

        {/* Media Preview */}
        {mediaFile && (
          <div className="mb-6 relative">
            {mediaFile.type === 'image' ? (
              <img 
                src={mediaFile.url} 
                alt="Post media" 
                className="w-full h-64 object-cover rounded-xl"
              />
            ) : (
              <video 
                src={mediaFile.url} 
                controls
                className="w-full h-64 object-cover rounded-xl"
              />
            )}
            <button
              onClick={removeMedia}
              className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* Title Display */}
        <div className="mb-4">
          <label className="text-white text-sm font-bold mb-2 block">Title</label>
          <div
            onClick={handleTitleClick}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 cursor-pointer hover:border-purple-400 transition-colors min-h-[48px] flex items-center"
          >
            {title ? (
              <span>{title}</span>
            ) : (
              <span className="text-white/40">Tap to add title...</span>
            )}
          </div>
          {title && <p className="text-white/40 text-xs mt-1">{title.length}/50 characters</p>}
        </div>

        {/* Description Display */}
        <div className="mb-6">
          <label className="text-white text-sm font-bold mb-2 block">Description</label>
          <div
            onClick={handleDescriptionClick}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 cursor-pointer hover:border-purple-400 transition-colors min-h-[100px] flex items-start"
          >
            {description ? (
              <span className="whitespace-pre-wrap">{description}</span>
            ) : (
              <span className="text-white/40">Tap to add description...</span>
            )}
          </div>
          {description && <p className="text-white/40 text-xs mt-1">{description.length}/300 characters</p>}
        </div>

        {/* Active Editing Field Indicator */}
        {editingField && (
          <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-3 mb-4">
            <p className="text-purple-400 text-sm">
              ✏️ Editing: <span className="font-bold">{editingField === 'title' ? 'Title' : 'Description'}</span>
            </p>
          </div>
        )}
      </div>

      {/* Message Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-4 py-3 border-t border-white/10" style={{ background: 'rgba(5, 15, 35, 0.95)' }}>
        {/* SVG Gradient Definitions */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="paperclipGradientPost" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffed6e', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="flex items-center gap-2">
          {/* Attachment Icon with Light Gold Neon Gradient */}
          <button className="flex-shrink-0">
            <Paperclip 
              className="w-5 h-5"
              style={{
                stroke: 'url(#paperclipGradientPost)',
                filter: 'drop-shadow(0 0 4px rgba(255, 237, 78, 0.8)) drop-shadow(0 0 6px rgba(255, 230, 109, 0.6))',
                strokeWidth: 2
              }}
            />
          </button>

          {/* Input Field with Neon Outline */}
          <div 
            className="flex-1 rounded-full p-[2px]"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={editingField ? `Type ${editingField}...` : "Select title or description to edit..."}
              className="w-full rounded-full px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
              style={{
                background: 'rgba(5, 15, 35, 0.9)'
              }}
            />
          </div>

          {/* Send Button with Neon Glow - Always Active */}
          <button 
            onClick={handleSendMessage}
            className="flex-shrink-0 -ml-1"
          >
            <img 
              src={sendIconImage} 
              alt="Send" 
              className="w-14 h-14 object-contain"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 12px rgba(255, 0, 153, 0.6)) drop-shadow(0 0 18px rgba(138, 43, 226, 0.5))'
              }}
            />
          </button>
        </div>
      </div>

      {/* Media Options Modal */}
      {showMediaOptions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end max-w-[430px] mx-auto">
          <div className="w-full bg-[rgba(5,15,35,0.95)] rounded-t-3xl p-6 animate-slide-up">
            <h3 className="text-white text-xl font-bold mb-4">Add Photo or Video</h3>
            
            <button
              onClick={() => handleMediaUpload('camera')}
              className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors mb-3 flex items-center justify-center gap-3"
            >
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white font-bold">Take Photo</span>
            </button>

            <button
              onClick={() => handleMediaUpload('library')}
              className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors mb-3 flex items-center justify-center gap-3"
            >
              <ImageIcon className="w-6 h-6 text-white" />
              <span className="text-white font-bold">Choose from Library</span>
            </button>

            <button
              onClick={() => setShowMediaOptions(false)}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span className="text-white/60">Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
