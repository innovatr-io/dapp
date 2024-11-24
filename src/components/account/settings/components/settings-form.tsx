import { useState } from "react";

export function SettingsForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement profile update logic
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your display name"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Make profile public</span>
              <input type="checkbox" className="toggle toggle-primary" />
            </label>
          </div>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
